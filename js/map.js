var message;
var cityCircle;
var result = loadcsv2('./csvdata/original_planking.csv'); //CSVのデータから緯度を取得する

// 観光名所の位置情報と人気度
var citymap = new Array();

for(var i=0; i<=result.length-1; i++){
    citymap[i] = {
        //緯度 lat, 経度 lng
        center: new google.maps.LatLng(result[i].lat, result[i].lng),
        population: result[i].pop
    };
}

// 位置情報取得
function start_func(){
	get_location();
}

// ( 1 )位置情報を取得します。
function get_location(){
	if (navigator.geolocation) {
    // 現在の位置情報取得を実施 正常に位置情報が取得できると、
    // successCallbackがコールバックされます。
    navigator.geolocation.getCurrentPosition
    (successCallback,errorCallback);
    } else {
        console.log("error")
    }
}
// ( 2 )位置情報が正常に取得されたら
function successCallback(pos) {
	var Potition_latitude = pos.coords.latitude; //緯度
	var Potition_longitude = pos.coords.longitude;　//軽度

    // 位置情報が取得出来たらGoogle Mapを表示する
    initialize(Potition_latitude,Potition_longitude);
}

function errorCallback(error) {
    console.log("error")
}

// ( 3 )Google Map API を使い、地図を読み込み
function initialize(x,y) {

    // Geolocationで取得した座標を代入
    // FirefoxOS端末及びシミュレータが現在地をただしくとれないため一時的に固定
    // var myLatlng = new google.maps.LatLng(x,y);
    var myLatlng = new google.maps.LatLng(34.878025, 135.576926);

    var mapOptions = {
    	zoom: 17,
    	center: myLatlng,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    // MapTypeId に、地図タイプを指定
    // HYBRID 衛星画像と主要な通りが表示されます
    // ROADMAP 通常の地図画像が表示されます
    // SATELLITE 衛生画像が表示されます。
    // TERRAIN 地形や植生などのマッピングをします。

    var map = new google.maps.Map
    (document.getElementById("map_canvas"), mapOptions);

    // citymapのそれぞれの値のための円を作図する
    // ノート: 人口に基づいてサークルのエリアをスケールする
    for (var city in citymap) {
        var populationOptions = {
          strokeColor: '#FF0000',
          strokeOpacity: 0.8, //透明度
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: citymap[city].center,
          radius: Math.sqrt(citymap[city].population) * 50
        };
        // マップへcityのための円を加える
        cityCircle = new google.maps.Circle(populationOptions);
    }

    //現在地にマーカーを置く
    var marker = new google.maps.Marker({
    	position: myLatlng,
    	map: map,
    	title:"Your position"
    });
}

google.maps.event.addDomListener(window, 'load', initialize);