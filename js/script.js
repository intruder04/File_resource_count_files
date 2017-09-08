(function() {
  var config = {
    updateInterval: 30000
  };

  /*
   * App logic
   */

  var currentCategory;
  var noCatalog = "Нет каталога";
  var disk = "U"

  function buildTable() {
    // if (!(window.data instanceof Array) || window.data.length === 0) {
      // alert("Data array is not ready, refreshing the page.");
      // window.location.reload();
    // }

    var $tbody = $('<tbody>');
    var $rows = [];

    data.forEach(function(integration, index) {
      var $row = $('<tr>');
      integration.socCounter = integration.socCounter.replace("Not_exist",noCatalog);
      var $cells = [
        $('<td>').attr('class', 'index'),
        $('<td>').attr('class', 'name').text(integration.folderName),
        $('<td>').attr('class', 'zap').text(integration.zapCounter),
        $('<td>').attr('class', 'soc').text(integration.socCounter),
        $('<td>').attr('class', 'date').text(integration.date),
      ]      
      // console.log($cells);
           var $folder = "";
      $cells.forEach(function(cell){
      var $text = $(cell).text();

        if ($(cell).hasClass('name')){
          $folder = $(cell).text();
          $(cell).empty();
           $('<a>',{
            text: $text,
            href: 'file:///U:/'+$folder
          }).appendTo(cell);
        }
        
         if ($(cell).hasClass('zap') || $(cell).hasClass('soc')){

          if ($(cell).hasClass('zap')){
              var $folder2 = $folder+'/Зарплатные договора';
              $(cell).empty();
             $('<a>',{
            text: $text,
            href: 'file:///'+disk+':/'+$folder2
            }).appendTo(cell);
          }

           if ($(cell).hasClass('soc')){
              var $folder2 = $folder+'/Социальные договора';
              $(cell).empty();
             $('<a>',{
            text: $text,
            href: 'file:///'+disk+':/'+$folder2
            }).appendTo(cell);
          }
          if ($(cell).text() == noCatalog){
            $(cell).addClass('blacktd');
          }
          else if(($(cell).text() <=2) && ($(cell).text() >=1)){
            $(cell).addClass('greentd');
          }
          else if(($(cell).text() <10) && ($(cell).text() >=3)){
            $(cell).addClass('yellowtd');
          }
            else if($(cell).text() >=10){
            $(cell).addClass('redtd');
          }
           }

      })

      $row.append($cells);
      $rows.push($row);
    });



    $tbody.append($rows);
    if (currentCategory) {
      $tbody.find('tr:not(.' + currentCategory + ')').hide();
    }

    $('table tbody').replaceWith($tbody);
  }

  var dataUpdateInterval = setInterval(function() {
    $('#script-data').remove();
    var s = $('<script>');
    s[0].src = 'socium_resource_status.js?nocache=' + new Date().getTime() + Math.random();
    s[0].id = 'script-data';
    s[0].onload = buildTable;
    s[0].onerror = location.reload;
    document.body.appendChild(s[0]);
  }, config.updateInterval);

  $(document).ready(buildTable);

}());