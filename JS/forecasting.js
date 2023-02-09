var url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-63A6B843-0CD8-4205-936A-3601802A5B7A&locationName=';
window.onload = function () {
  var counter = 0;

  async function getIss() {
    let response = await fetch(url);
    var data = await response.json();
    let Description = document.querySelector('.weather-title');
    let region = document.querySelector('.region-select');
    let regionValue = region.value;//當前選擇的資料
    let regionCheck = document.querySelector('.region-check');
    let clearCheck = document.querySelector('.clear-check');
    console.log(data.records);
    console.log(data.records.location);
    var locations = data.records.location;//所有地區(array type)






    locations.forEach(element => {//把所有地區放進選項
      const regionOption = document.createElement('option');
      counter++;
      regionOption.innerHTML = element.locationName;
      region.appendChild(regionOption);
    });


    regionCheck.addEventListener('click', function check() {//地區選擇
      let region = document.querySelector('.region-select');
      let regionValue = region.value;
      let day = document.querySelectorAll('.time-day');
      let timeLength = locations[0].weatherElement[0].time.length;
     
      //天氣預報時間陣列的長度
      var x = 0;

      function clearContentNodes() {
        let child_node = document.querySelectorAll('.content');
        
        child_node.forEach(child => {
          if (child.hasChildNodes) {
            child.parentNode.removeChild(child);
          };
        });
      }
      clearContentNodes();//刪除所有內容

      locations.forEach(element => {

        if (regionValue === element.locationName) {//選取當前地區的資料
            regionCheck.innerHTML=regionValue;
          day.forEach(allNode => {
            if (day[x].childNodes.length < timeLength) {
              //判斷每個節點超過陣列長度(未來三天的時間)就不執行
              
              element.weatherElement[x].time.forEach(allTime => {

                let div = document.createElement('div');
                let startTime = allNode.appendChild(div);
                startTime.setAttribute('class', 'content');    
                startTime.innerHTML = `<p>${allTime.parameter.parameterName}</p><br><p>起始:${allTime.startTime}</p><br><p>結束${allTime.endTime}</p><hr>`;
                
                

              });

            };

            x++;
          });
        };
      });
    });
  };

  getIss();




}