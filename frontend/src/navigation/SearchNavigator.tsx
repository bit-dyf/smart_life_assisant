import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Switch,
  Alert,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';

const Stack = createStackNavigator();

// 替换为您的有效高德 API Key
// Web 服务 API Key - 用于 HTTP 请求搜索地点
const AMAP_WEB_API_KEY = 'yourkey';
// Web端(JS API) Key - 用于 WebView 中显示地图
const AMAP_JS_API_KEY = 'yourkey';
// 安全密钥 - 用于JS API的安全验证（请从高德控制台获取）
const AMAP_SECURITY_KEY = 'yourkey'; // 请替换为您从高德控制台获取的实际安全密钥

// 开发者预设的默认搜索地点（当用户拒绝定位时使用）
const DEFAULT_LOCATION = {
  city: '北京市',
  coordinates: {
    longitude: 116.397128,
    latitude: 39.916527
  },
  name: '开启定位'
};

// 预设的搜索分类
const SEARCH_CATEGORIES = [
  { label: '餐饮美食', keywords: '餐厅|美食|小吃|咖啡厅', types: '050000' },
  { label: '购物商场', keywords: '商场|购物中心|超市|便利店', types: '060000' },
  { label: '景点游玩', keywords: '景点|公园|游乐园|博物馆', types: '110000' },
  { label: '酒店住宿', keywords: '酒店|宾馆|民宿', types: '100000' },
  { label: '生活服务', keywords: '银行|医院|药店|加油站', types: '070000|090000|120000' },
  { label: '交通设施', keywords: '地铁站|公交站|停车场', types: '150000' },
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [presetLocation, setPresetLocation] = useState('');
  const [currentCoordinates, setCurrentCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [mapCenter, setMapCenter] = useState<{ longitude: number; latitude: number } | null>(null);

  useEffect(() => {
    if (useCurrentLocation) {
      requestLocationPermission();
    }
  }, [useCurrentLocation]);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        getCurrentLocation();
      } else {
        setError('需要定位权限才能搜索附近地点');
        Alert.alert('权限提醒', '需要定位权限才能搜索附近地点。请在设置中开启。');
      }
    } catch (err) {
      console.warn(err);
      setError('请求定位权限时出错');
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 15000,
        distanceInterval: 10,
      });
      
      setCurrentCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLoading(false);
      setError(null);
    } catch (error: any) {
      setError(`获取位置失败: ${error.message}`);
      setCurrentCoordinates(null);
      setLoading(false);
      Alert.alert('定位失败', `无法获取当前位置: ${error.message}`);
    }
  };

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category.label);
    setSearchQuery(category.keywords);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() && !selectedCategory) {
      Alert.alert('提示', '请输入搜索关键词或选择分类');
      setResults([]);
      return;
    }
    if (!AMAP_WEB_API_KEY || AMAP_WEB_API_KEY.length < 20) {
      setError('请先配置有效的高德 Web 服务 API Key');
      setResults([]);
      Alert.alert('配置错误', '请先配置有效的高德 Web 服务 API Key');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    let apiParams: any = {
      key: AMAP_WEB_API_KEY,
      keywords: searchQuery || selectedCategory,
      offset: 20,
      page: 1,
    };

    // 根据分类添加 types 参数
    const selectedCategoryObj = SEARCH_CATEGORIES.find(cat => cat.label === selectedCategory);
    if (selectedCategoryObj) {
      apiParams.types = selectedCategoryObj.types;
    }

    let apiUrl = 'https://restapi.amap.com/v3/place/text'; // 默认使用关键字搜索

    if (useCurrentLocation) {
      if (!currentCoordinates) {
        // 如果无法获取当前位置，自动使用默认地点进行周边搜索
        apiUrl = 'https://restapi.amap.com/v3/place/around';
        apiParams.location = `${DEFAULT_LOCATION.coordinates.longitude},${DEFAULT_LOCATION.coordinates.latitude}`;
        apiParams.radius = 5000; // 搜索半径5公里
        delete apiParams.keywords; // 周边搜索使用 types 参数
        if (searchQuery.trim()) {
          apiParams.keywords = searchQuery;
        }
      } else {
        // 使用当前位置进行周边搜索
        apiUrl = 'https://restapi.amap.com/v3/place/around';
        apiParams.location = `${currentCoordinates.longitude},${currentCoordinates.latitude}`;
        apiParams.radius = 5000; // 搜索半径5公里
        delete apiParams.keywords; // 周边搜索使用 types 参数
        if (searchQuery.trim()) {
          apiParams.keywords = searchQuery;
        }
      }
    } else {
      // 使用预设地点或默认地点
      const searchCity = presetLocation.trim() || DEFAULT_LOCATION.city;
      apiParams.city = searchCity;
    }

    try {
      const response = await axios.get(apiUrl, { params: apiParams });

      if (response.data && response.data.status === '1' && response.data.pois && response.data.pois.length > 0) {
        setResults(response.data.pois);
        // 搜索完成后，自动移动地图到第一个搜索结果
        const firstResult = response.data.pois[0];
        if (firstResult.location && firstResult.location.split(',').length === 2) {
          const [lng, lat] = firstResult.location.split(',').map(Number);
          // 更新地图中心点状态，让地图重新渲染并居中到第一个结果
          setMapCenter({ longitude: lng, latitude: lat });
        }
      } else {
        const errorMsg = response.data.info || '未找到结果';
        setError(errorMsg);
        setResults([]);
        Alert.alert('搜索结果', errorMsg + '，请尝试其他关键词或地点。');
      }
    } catch (err: any) {
      console.error(err);
      const errorMsg = `搜索请求发生错误: ${err.message || '未知网络错误'}`;
      setError(errorMsg);
      setResults([]);
      Alert.alert('请求错误', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.label && styles.selectedCategoryButton
      ]}
      onPress={() => handleCategorySelect(item)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item.label && styles.selectedCategoryText
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderResultItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.resultItem}>
      <View style={styles.resultHeader}>
        <View style={[styles.resultIndex, { backgroundColor: index === 0 ? '#FF6B6B' : '#4ECDC4' }]}>
          <Text style={styles.resultIndexText}>{index + 1}</Text>
        </View>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <Text style={styles.itemAddress}>
        {item.address || `${item.cityname || ''}${item.adname || ''}`}
      </Text>
      {item.distance && (
        <Text style={styles.itemDistance}>距离: {item.distance}米</Text>
      )}
      {item.tel && (
        <Text style={styles.itemTel}>电话: {item.tel}</Text>
      )}
      {item.business && (
        <Text style={styles.itemBusiness}>营业信息: {item.business}</Text>
      )}
    </View>
  );

  // 生成高德地图的 HTML 内容
  const generateMapHTML = () => {
    // 优先使用搜索结果的中心点，其次是当前位置，最后是默认位置
    const centerLng = mapCenter?.longitude || currentCoordinates?.longitude || DEFAULT_LOCATION.coordinates.longitude;
    const centerLat = mapCenter?.latitude || currentCoordinates?.latitude || DEFAULT_LOCATION.coordinates.latitude;
    
    // 构建搜索结果标记的 JavaScript 代码
    const markersJS = results.map((item: any, index: number) => {
      if (item.location && item.location.split(',').length === 2) {
        const [lng, lat] = item.location.split(',').map(Number);
        return `
          var marker${index} = new AMap.Marker({
            position: new AMap.LngLat(${lng}, ${lat}),
            title: "${item.name}",
            content: '<div style="background: ${index === 0 ? '#FF6B6B' : '#4ECDC4'}; color: white; padding: 6px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${index + 1}</div>'
          });
          map.add(marker${index});
          
          // 为第一个结果添加点击事件
          ${index === 0 ? `
            marker${index}.on('click', function() {
              var infoWindow = new AMap.InfoWindow({
                content: '<div style="padding: 10px; max-width: 200px;"><h4 style="margin: 0 0 5px 0; color: #333;">${item.name}</h4><p style="margin: 0; color: #666; font-size: 12px;">${item.address || '地址信息暂无'}</p></div>',
                offset: new AMap.Pixel(0, -30)
              });
              infoWindow.open(map, marker${index}.getPosition());
            });
          ` : ''}
        `;
      }
      return '';
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>高德地图</title>
        <style type="text/css">
          html, body, #mapContainer {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
        <script type="text/javascript">
          window._AMapSecurityConfig = {
            securityJsCode: '${AMAP_SECURITY_KEY}',
          }
        </script>
        <script type="text/javascript" src="https://webapi.amap.com/maps?v=2.0&key=${AMAP_JS_API_KEY}"></script>
      </head>
      <body>
        <div id="mapContainer"></div>
        <script type="text/javascript">
          // 创建地图实例
          try {
            var map = new AMap.Map('mapContainer', {
              center: [${centerLng}, ${centerLat}],
              zoom: ${results.length > 0 ? '16' : '15'}, // 有搜索结果时放大一点
              mapStyle: 'amap://styles/normal'
            });

            // 地图加载完成后的回调
            map.on('complete', function() {
              console.log('地图加载完成');
            });

            // 添加当前位置标记
            var currentMarker = new AMap.Marker({
              position: new AMap.LngLat(${currentCoordinates?.longitude || DEFAULT_LOCATION.coordinates.longitude}, ${currentCoordinates?.latitude || DEFAULT_LOCATION.coordinates.latitude}),
              title: "${currentCoordinates ? "当前位置" : DEFAULT_LOCATION.name}",
              content: '<div style="background: #007AFF; color: white; padding: 6px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${currentCoordinates ? "📍" : "📌"}</div>'
            });
            map.add(currentMarker);

            // 添加搜索结果标记
            ${markersJS}

            // 如果有搜索结果，优化地图视野
            ${results.length > 0 ? `
              // 自动调整地图以显示第一个搜索结果为中心
              setTimeout(function() {
                map.setCenter([${centerLng}, ${centerLat}]);
                map.setZoom(16);
              }, 500);
            ` : ''}
          } catch (error) {
            console.error('地图初始化失败:', error);
            document.body.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">地图加载失败: ' + error.message + '</div>';
          }
        </script>
      </body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      {/* 背景地图 - 使用高德地图 WebView */}
      <WebView
        style={styles.map}
        source={{ html: generateMapHTML() }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />

      {/* 浮动控制面板 */}
      <View style={styles.overlay}>
        {/* 顶部搜索面板 */}
        <View style={styles.searchPanel}>
          {/* 位置状态指示器 */}
          <View style={styles.locationIndicator}>
            <Text style={styles.locationText}>
              {currentCoordinates ? "📍 当前位置" : `📌 ${DEFAULT_LOCATION.name}`}
            </Text>
            <Switch
              style={styles.locationSwitch}
              value={useCurrentLocation}
              onValueChange={(value) => {
                setUseCurrentLocation(value);
                if (value && !currentCoordinates) {
                  requestLocationPermission();
                }
              }}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={useCurrentLocation ? "#f5dd4b" : "#f4f3f4"}
            />
          </View>

          {/* 预设地点输入 */}
          {!useCurrentLocation && (
            <TextInput
              style={styles.presetInput}
              placeholder="输入城市或区域"
              value={presetLocation}
              onChangeText={setPresetLocation}
              placeholderTextColor="#999"
            />
          )}

          {/* 搜索分类 */}
          <FlatList
            data={SEARCH_CATEGORIES}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.label}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryList}
          />

          {/* 搜索输入框 */}
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="搜索地点..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
              disabled={loading}
            >
              <Text style={styles.searchButtonText}>搜索</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 底部结果面板 */}
        {(results.length > 0 || loading || error) && (
          <View style={styles.resultsPanel}>
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>正在搜索...</Text>
              </View>
            )}
            
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {results.length > 0 && (
              <>
                <Text style={styles.resultsTitle}>搜索结果 ({results.length})</Text>
                <FlatList
                  data={results.slice(0, 5)} // 只显示前5个结果，避免遮挡地图
                  renderItem={renderResultItem}
                  keyExtractor={(item: any) => item.id}
                  style={styles.resultsList}
                  showsVerticalScrollIndicator={false}
                />
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const SearchNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="搜索"
        component={SearchScreen}
        options={{ headerShown: false }} // 隐藏导航栏标题
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  searchPanel: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  locationIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  locationSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  presetInput: {
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 14,
  },
  categoryList: {
    marginBottom: 12,
  },
  categoryButton: {
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
  },
  selectedCategoryText: {
    color: 'white',
    fontWeight: '500',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  resultsPanel: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    maxHeight: 300,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  resultsList: {
    maxHeight: 200,
  },
  resultItem: {
    backgroundColor: 'rgba(248, 248, 248, 0.8)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  itemDistance: {
    fontSize: 11,
    color: '#007AFF',
    marginBottom: 2,
  },
  itemTel: {
    fontSize: 12,
    color: '#333',
    marginBottom: 2,
  },
  itemBusiness: {
    fontSize: 11,
    color: '#999',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  resultIndex: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  resultIndexText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default SearchNavigator;
