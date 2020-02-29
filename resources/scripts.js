window.onload=function() {

  function resetFilters() {
    var c = document.getElementsByClassName('template_algorithm');
    for(i = 0; i < c.length; i++) {
      c[i].classList.remove("hide");
    }
    var col = document.getElementsByClassName("checks");
    for(i = 0; i < col.length; i++)
      col[i].checked = false;
  }

  var tabel=document.getElementById("algs");
  document.getElementById("filter_by_complexity").onclick=function(){
    var val = prompt("What complexity are you looking for?");
    var c = tabel.querySelectorAll("tr td:nth-child(6)");
    for(i = 0; i < c.length; i++) {
      if(c[i].innerHTML != val){
        var rand = c[i].closest("tr");
        c[i].closest("tr").classList.add("hide");
      }
    }
  }

  document.getElementById("sort_algs").onclick=function(){
    var rows, switching, i, x, y, shouldSwitch;
    switching = true;
    for(i = 1; i < tabel.rows.length; i++)
      tabel.rows[i].classList.add("hide");
    while (switching) {
      switching = false;
      rows = tabel.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[1];
        y = rows[i + 1].getElementsByTagName("TD")[1];
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    var count = 0;
    var int = setInterval(function(){
      count++;
      if(count < tabel.rows.length)
          tabel.rows[count].classList.remove("hide");
      else clearInterval(int);
    },
    1000);
  }

  document.getElementById("reset_filters").onclick=function(){
    var tabel=document.getElementById("algs");
    var c = tabel.querySelectorAll("tr");
    for(i = 1; i < c.length; i++) {
      c[i].closest("tr").classList.remove("hide");
    }
  }

  document.getElementById("filter_templates").onclick=function(){
    var val = prompt("What complexity are you looking for?");
    var c = document.getElementsByClassName('template_algorithm');
    for(i = 0; i < c.length; i++) {
      var compl=c[i].querySelector("#complexity");
      if(compl.innerHTML != ("Complexity: " + val)) {
        c[i].classList.add("hide");
      }
    }
  }

  document.getElementById("reset_templates_filters").onclick=resetFilters;

  var div_filters=document.getElementById("filters");
  var complexities = ["n", "n_logn", "n_squared"];
  var categories = ["sort", "graph", "search"];
  var display_complexity = ["O(N)", "O(N*logN)", "O(Nˆ2)"];
  var display_catergory = new Array("sorting", "graph", "searching");

  div_filters.innerHTML += "Filters:<br><br>";

  for(i = 0; i < 3; i++) {

    var newCheckBox_complexity = document.createElement('input');
    newCheckBox_complexity.type = 'checkbox';
    newCheckBox_complexity.id = 'complexity' + i;
    newCheckBox_complexity.value = complexities[i];
    newCheckBox_complexity.classList.add("checks");

    var newCheckBox_category = document.createElement('input');
    newCheckBox_category.type = 'checkbox';
    newCheckBox_category.id = 'category' + i;
    newCheckBox_category.value = categories[i];
    newCheckBox_category.classList.add("checks");

    var text_complexity = document.createTextNode(display_complexity[i] + "");
    var text_category = document.createTextNode(display_catergory[i]);
    var br = document.createElement("br");

    div_filters.appendChild(newCheckBox_complexity);
    div_filters.appendChild(text_complexity);
    div_filters.appendChild(newCheckBox_category);
    div_filters.appendChild(text_category);
    div_filters.appendChild(br);

  }

  div_filters.innerHTML += "<br>";
  var newTextInput = document.createElement('input');
  newTextInput.type = "text";
  newTextInput.value = "default_value";
  newTextInput.id = "name_text";
  var newTextNode = document.createTextNode("Type the beggining of the name of the algorithm:");
  div_filters.appendChild(newTextNode);
  div_filters.appendChild(newTextInput);

  div_filters.innerHTML += "<br>";
  var newRange = document.createElement("input");
  newRange.type = "range";
  newRange.id = "value_range";
  newRange.min = 0;
  newRange.max = 4000;
  newRange.step = 100;
  newRange.value = 2000;
  newRange.classList.add("slider");
  var text_min = document.createTextNode(" Article count: 0 ");
  var text_max = document.createTextNode(" 4000");
  div_filters.innerHTML += "<br>";

  div_filters.appendChild(text_min);
  div_filters.appendChild(newRange);
  div_filters.appendChild(text_max);
  div_filters.innerHTML += "<br>";

  var par_curr_value = document.createElement("p");
  par_curr_value.id = "par_curr_value";
  par_curr_value.innerHTML = "Current value: " + document.getElementById("value_range").value
  div_filters.appendChild(par_curr_value);

  div_filters.innerHTML += "<br>";
  var newButton = document.createElement("button");
  newButton.id = "filter_checkboxes";
  newButton.innerHTML = "Filter!!";
  div_filters.appendChild(newButton);

  var newButton2 = document.createElement("button");
  newButton2.id = "reset_filters_checkboxes";
  newButton2.innerHTML = "Reset filters!!";
  div_filters.appendChild(newButton2);

  var filt2 = document.getElementById("filters2");

  var newSelect = document.createElement("select");
  newSelect.id = "select_filter";
  filt2.appendChild(newSelect);
  for(el of display_complexity){
     var option = document.createElement("option");
     option.text = el;
     option.value = el;
     newSelect.appendChild(option);
  }

  var newTextArea = document.createElement("textarea");
  newTextArea.name = "new_text_area";
  newTextArea.length = "5000";
  newTextArea.id = "filter_text_area";
  newTextArea.cols = "30";
  newTextArea.rows = "5";
  filt2.innerHTML += "<br><br>";
  var newTextNode = document.createTextNode("Words to find in description:");
  filt2.appendChild(newTextNode);
  filt2.innerHTML += "<br>";
  filt2.appendChild(newTextArea);
  filt2.innerHTML += "<br><br>";

  var cat = ["Array searching algorithm", "Shortest paths in a graph", "Minimum span tree of a graph"];

  for(i = 0; i < 3; i++) {
    var newRadioButton = document.createElement("input");
    newRadioButton.type = "radio";
    newRadioButton.name = "radio_button";
    filt2.appendChild(newRadioButton);
    var textRadio = document.createTextNode(cat[i]);
    filt2.appendChild(textRadio);
    filt2.innerHTML += "<br>";
  }
  filt2.innerHTML += "<br>";

  var newButton = document.createElement("button");
  newButton.id = "filter_select";
  newButton.innerHTML = "Filter!!";
  filt2.appendChild(newButton);

  var newButton2 = document.createElement("button");
  newButton2.id = "reset_filters_select";
  newButton2.innerHTML = "Reset filters!!";
  filt2.appendChild(newButton2);

  filt2.innerHTML += "<br><br>"

  document.getElementById("filter_checkboxes").onclick=function(){

    var filtering_complexity = "!";
    var filtering_category = "!";

    if(document.getElementById("complexity0").checked)
      filtering_complexity = document.getElementById("complexity0").nextSibling.textContent;
    if(document.getElementById("complexity1").checked)
      filtering_complexity = document.getElementById("complexity1").nextSibling.textContent;
    if(document.getElementById("complexity2").checked)
      filtering_complexity = document.getElementById("complexity2").nextSibling.textContent;

    if(document.getElementById("category0").checked)
      filtering_category = document.getElementById("category0").nextSibling.textContent;
    if(document.getElementById("category1").checked)
      filtering_category = document.getElementById("category1").nextSibling.textContent;
    if(document.getElementById("category2").checked)
      filtering_category = document.getElementById("category2").nextSibling.textContent;

    var c = document.getElementsByClassName('template_algorithm');
    var text_name = document.getElementById("name_text").value;

    if(text_name.length > 1){
      for(i = 0; i < c.length; i++) {
        var c_name=c[i].querySelector("#name");
        for(j = 0; j < text_name.length; j++) {
          if(text_name.toLowerCase()[j] != c_name.innerHTML.toLowerCase()[j])
            c[i].classList.add("hide");
        }
      }
    }

    if(filtering_complexity != "!") {
      for(i = 0; i < c.length; i++) {
        var compl=c[i].querySelector("#complexity");
        if(compl.innerHTML != ("Complexity: " + filtering_complexity)) {
          c[i].classList.add("hide");
        }
      }
    }

    if(filtering_category != "!") {
      for(i = 0; i < c.length; i++) {
        var categ=c[i].querySelector("#category");
        if(categ.innerHTML.includes(filtering_category) === false) {
          c[i].classList.add("hide");
        }
      }
    }

    var sld = document.getElementById("value_range").value;
    for(i = 0; i < c.length; i++) {
      var nrart = c[i].querySelector("#articles");
      if(parseInt(nrart.innerHTML) < sld)
        c[i].classList.add("hide");
    }
  }
  document.getElementById("reset_filters_checkboxes").onclick=resetFilters;

  document.getElementById("filter_select").onclick = function() {
    var sel_list = document.getElementById("select_filter");
    var chosen_value = sel_list.options[sel_list.selectedIndex].text;
    var algs = document.getElementsByClassName('template_algorithm');
    var text_area = document.getElementById("filter_text_area").value;
    var str = text_area.split(",");
    var filter_radio = "";
    var radios = document.getElementsByName("radio_button");
    for(let j = 0; j < radios.length; j++)
      if(radios[j].checked == true)
        filter_radio = radios[j].nextSibling.textContent;
    for(let i = 0; i < algs.length; i++){
      var compl = algs[i].querySelector("#complexity").innerHTML;
      var descript = algs[i].querySelector("#description");
      var categ = algs[i].querySelector("#category");
      var compl_comparer = String("Complexity: " + chosen_value);
      if(compl.localeCompare(compl_comparer)!=0)
        algs[i].classList.add("hide");
      for(let j = 0; j < str.length; j++){
        if(descript.innerHTML.toLowerCase().includes(str[j]) == false)
          algs[i].classList.add("hide");
      }
      if(categ.innerHTML != "Category: " + filter_radio)
        algs[i].classList.add("hide");
    }
  }

  document.getElementById("reset_filters_select").onclick=resetFilters;

  document.addEventListener('keydown', function(e) {
    var cont = document.getElementById("p_algs");
    if(e.shiftKey && e.keyCode == 73) {
      var col = document.querySelectorAll(".template_algorithm");
      for(let i = col.length - 1; i >= 0; i--)
        cont.appendChild(col[i]);
        this.remove();
      }
  } );

  var slider = document.getElementById("value_range");
  slider.onchange=function(){
    var p_c_v = document.getElementById("par_curr_value");
    p_c_v.innerHTML = "Current value: " + this.value;
  }

  var col = document.getElementsByClassName("template_algorithm");
    for(let i = 0; i < col.length; i++){
      col[i].addEventListener('dblclick', function(e){
        setTimeout(function(){
          var target_del = col[i].querySelectorAll("article > div > *");
          for(let i = 0; i < target_del.length; i++)
            target_del[i].classList.toggle("hide");

          var target_p_image = col[i].querySelector("article > div > #image");
          target_p_image.classList.remove("hide");

          var target_image = col[i].querySelector("article > div > #image > img");
          if(target_image.width == "10")
            target_image.width = target_image.height = "200";
          else target_image.width = target_image.height = "10";
        }, 1000);
    });
  }

    function getOffset(el) {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left,
        top: rect.top
      };
    }

  var buttons = document.querySelectorAll(".template_algorithm > article > div > #favorites");
  document.onmousemove=function(e){
    for(let i = 0; i < buttons.length; i++) {
      var change = false;
      var mouse_x = parseInt(e.clientX);
      var mouse_y = parseInt(e.clientY);
      var button_top = parseInt(getOffset(buttons[i]).top);
      var button_down = button_top + parseInt(buttons[i].offsetHeight);
      var button_left = parseInt(getOffset(buttons[i]).left);
      var button_right = button_left + parseInt(buttons[i].offsetWidth);
      if(mouse_y + 20 >= button_top && mouse_y <= button_top && mouse_x >= button_left && mouse_x <= button_right)
        change = true;
      if(mouse_y - 20 <= button_down && mouse_y >= button_down && mouse_x >= button_left && mouse_x <= button_right)
        change = true;
      if(mouse_x + 20 >= button_left && mouse_x <= button_left && mouse_y >= button_top && mouse_y <= button_down)
        change = true;
      if(mouse_x - 20 <= button_right && mouse_x >= button_right && mouse_y >= button_top && mouse_y <= button_down)
        change = true;
      if(change == true)
        buttons[i].style.backgroundColor = "yellow";
      else buttons[i].style.backgroundColor = "white";
      if(mouse_x >= button_left && mouse_x <= button_right && mouse_y >= button_top && mouse_y <= button_down)
        buttons[i].style.backgroundColor = "pink";
    }
  }
  var rm_buttons = document.querySelectorAll(".template_algorithm > article > div > #rm_item");

  for(i = 0; i < rm_buttons.length; i++)
    rm_buttons[i].onclick=function(){
      this.closest("div").closest("article").closest("div").remove();
    }
}
