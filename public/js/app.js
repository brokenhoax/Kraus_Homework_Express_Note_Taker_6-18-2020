


$('button[type="submit"]').on('click', function(event) {
  event.preventDefault();

  const noteTitle = $('input[name="note_title"]').val();

  $.ajax({
    url: '/add', 
    method: 'POST', 
    data: {
      note_title: noteTitle
    }
  })
  .then(function() {
    alert('Note was added.');
  })
  .catch(function() {
    alert('Note was not able to be added.')
  });
});;