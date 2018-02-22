

window.onload = init;
function init()
{
  // document.querySelector('#draggable').draggable = true;
  // var element = document.getElementById('clickme');
  // $(.lbl_drag).mousedown( function(){clicklabel($(this)); } );
   // alert( $('.lbl_drag').length );
   // $('label').css('background-color', "red");
   // $(.lbl_drag).on({
   //   dragstart:  function(e) {
   //       e.dataTransfer.setData('text/plain', "Ce texte sera transmis à l'élément HTML de réception");
   //       // e.dataTransfer.setDragImage(dragImg, 40, 40); // Une position de 40x40 pixels centrera l'image (de 80x80 pixels) sous le curseur
   //     }
   //
   // });
   // //
   //  $('label').addEventListener(
   //    'dragstart',
   //    function(e) {
   //      e.dataTransfer.setData('text/plain', "Ce texte sera transmis à l'élément HTML de réception");
   //      // e.dataTransfer.setDragImage(dragImg, 40, 40); // Une position de 40x40 pixels centrera l'image (de 80x80 pixels) sous le curseur
   //    });
      // document.querySelector('* [draggable="true"]').css('background-color', "red");
      // document.querySelector('* [draggable="true"]').addEventListener(
      //   'dragstart',
      //   function(e) {
      //     e.dataTransfer.setData('text/plain', "Ce texte sera transmis à l'élément HTML de réception");
      //     // e.dataTransfer.setDragImage(dragImg, 40, 40); // Une position de 40x40 pixels centrera l'image (de 80x80 pixels) sous le curseur
      //   });

      var elements = document.querySelectorAll('* [draggable="true"]');
      for(var i = 0; i < elements.length; i++)
      {
        elements[i].addEventListener(
          'dragstart',
          function(e) {
            var elem = e.target || e.srcElement;
            var index = elem.getAttribute("value");
            // alert(index);
            e.dataTransfer.setData('text/plain', index);
            // e.dataTransfer.setData('text/plain', "Ce texte sera transmis à l'élément HTML de réception");
              // alert($(this).getAttribute("name"));
// alert(e.target.getAttribute("value"));
            // e.dataTransfer.setData('text/plain', e.getAttribute("name"));
          // e.dataTransfer.setDragImage(dragImg, 40, 40); // Une position de 40x40 pixels centrera l'image (de 80x80 pixels) sous le curseur
        });

        elements[i].addEventListener(
          'drop',
          function(e) {
              e.preventDefault(); // Cette méthode est toujours nécessaire pour éviter une éventuelle redirection inattendue
              var elem = e.target || e.srcElement;
              var src_index = e.dataTransfer.getData('text/plain');
              var dest_index = elem.getAttribute("value");
              // alert('Vous avez bien déposé votre élément !');
              // alert(e.getAttribute("name"));
              // alert(e.dataTransfer.getData('text/plain'));
              // Il est nécessaire d'ajouter cela car sinon le style appliqué par l'événement « dragenter » restera en place même après un drop :

              // dropper.style.borderStyle = 'solid';
              // alert(src_index +" : "+ dest_index);
              post_dragdrop(src_index, dest_index);
          });

          elements[i].addEventListener(
            'dragover', function(e) {
                e.preventDefault(); // Annule l'interdiction de drop

            });

      }
};

function post_dragdrop(src_index, dest_index)
{
  // alert(src_index +" : "+ dest_index);

  $.post(
    'index.php',
    {
      "dragdrop":"true",
      "src_index":src_index,
      "dest_index":dest_index
    },
    function(data)
    {
      document.location.href="index.php";
    },
    'text'
  );
};
// function clicklabel(args)
// {
//   // // alert(args);
//   // $(this).addEventListener(
//   //   'dragstart',
//   //   function(e) {
//   //     e.dataTransfer.setData('text/plain', "Ce texte sera transmis à l'élément HTML de réception");
//   //     // e.dataTransfer.setDragImage(dragImg, 40, 40); // Une position de 40x40 pixels centrera l'image (de 80x80 pixels) sous le curseur
//   //   });
//
// };
function focuscheck(index)
{
  $.post(
    'index.php',
    {
      "tache_ligne":index,
      "submit":"Enregistrer"
    },
    function(data)
    {
      document.location.href="index.php";
    },
    'text'
  );


  //*********************************************
  // $.ajax({
  //   url: 'http://localhost/todolist/index.php',
  //   type='POST',
  //
  //   data: {
  //        fonction:'ecrireJSON',
  //        params: {param1: 'valeur1',
  //                     param2: 'valeur2'},
  //   },
  //   success: function(data)
  //   {
  //       ...
  //   }
  // });
  // $.ajax({
  //   url: 'index.php',
  //   type='POST',
  //
  //   data: {
  //        fonction:'ecrireJSON',
  //        params: {param1: 'valeur1',
  //                     param2: 'valeur2'},
  //   },
  //   success: function(data)
  //   {
  //       ...
  //   }
  // });


};
