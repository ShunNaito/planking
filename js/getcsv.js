function loadcsv2(url) {
    var httpObj = new XMLHttpRequest();
    httpObj.open('GET',url+"?"+(new Date()).getTime(),false);
    // ?�ȍ~�̓L���b�V�����ꂽ�t�@�C���ł͂Ȃ��A����ǂݍ��ނ��߂̂���
    httpObj.send(null);
    var rows = httpObj.responseText.split("\r\n");
    var data = new Array();

    var n;
    for (n = 1; n < rows.length; n++) {
    	var fields = rows[n].split(",");

        var lng = parseFloat(fields[0]);
        var lat = parseFloat(fields[1]);
        var pop = parseFloat(fields[2]);
        data.push({'lat': lat, 'lng': lng, 'pop': pop});
        // console.log(data[n-1]);
    }
    return data;
}
