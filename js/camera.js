	var message;
    var cityCircle;
  
    // 観光名所の位置情報と人気度
    var citymap = {};
    
    citymap['総情'] = {
      center: new google.maps.LatLng(34.878025, 135.576926),//緯度,経度
      population: 1050
      };
      
    citymap['USJ'] = {
      center: new google.maps.LatLng(34.664722, 135.433056),//緯度,経度
      population: 1050
    };
    citymap['海遊館'] = {
      center: new google.maps.LatLng(34.654472, 135.428889),
      population: 218
    };
    citymap['大阪市立科学館'] = {
      center: new google.maps.LatLng(34.691306, 135.491583),
      population: 38
    };
    citymap['交通科学博物館'] = {
      center: new google.maps.LatLng(34.670715, 135.461895),
      population: 28
    };

    function start_func(){
        callPickActivity();
    }

    function pickImageError() {
        console.log("error!!!!");
    }

    function imagePicked() {//写真を撮ってキャンバス上に描画
        var url = window.URL.createObjectURL(this.result.blob);
        var photo = new Image();
        photo.src = url;
        photo.onload = function() {
            var canvas = document.getElementById('canvassample');
            var context = canvas.getContext('2d');
            context.drawImage(photo, 0, 0, 320, 480);
        };
        get_location();//位置情報の取得
    }

    // ( 1 )位置情報を取得します。
    function get_location(){
    	document.getElementById("area_name").innerHTML
    	= '位置情報取得します';
    	if (navigator.geolocation) {
        // 現在の位置情報取得を実施 正常に位置情報が取得できると、
        // successCallbackがコールバックされます。
        navigator.geolocation.getCurrentPosition
        (successCallback,errorCallback);
        } else {
        	message = "本ブラウザではGeolocationが使えません";
        	document.getElementById("area_name").innerHTML
        	= message;
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
    	message = "位置情報が許可されていません";
    	document.getElementById("area_name").innerHTML = message;
    }

	
	
    // ( 3 )Google Map API を使い、地図を読み込み
    function initialize(x,y) {
    	document.getElementById("area_name").innerHTML
    	= 'google map情報を取得中';

        // Geolocationで取得した座標を代入
        //var myLatlng = new google.maps.LatLng(x,y);
        var myLatlng = new google.maps.LatLng(34.878025, 135.576926);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(citymap['総情'] ['center'], myLatlng);
       
        var point = 0;
        if(distance<50){
        point = 100;
        }
        console.log(point);
         //alert(point);
		document.getElementById("area_name").innerHTML = point;


              
    }
	

    
    function callPickActivity() {//写真撮る前段階（カメラを選ぶ段階）
        if (MozActivity) {
            var pick = new MozActivity({
                name: "pick",
                data: {
                    type: ["image/png", "image/jpg", "image/jpeg"]
                }
            });
            pick.onsuccess = imagePicked;
            pick.onerror = pickImageError;
        }
    }