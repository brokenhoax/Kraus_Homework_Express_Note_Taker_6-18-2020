
// This is our Note Template... 

const noteTemplate = (noteTitle, note_id, is_favorite) => { // Why can you change "noteTitle" to "note_title"?
  const noteContainer = $('<div>').attr({
    class: 'content-note__list',
    id: note_id //Not sure if this should be "note_id" or just "id" ^^^ I guess it doesn't matter!?! ^^^
  });

  const img = $('<img>').attr({
    src: '../images/notepadicon.png',
    alt: ''
  });

  const title = $('<p>');

  const button = $('<button>').attr({
    'data-id': note_id, //Not sure if this should be "note_id" or just "id" ^^^ I guess it doesn't matter!?! ^^^
    class: 'btn btn-btn-default favorites',
    'data-state': is_favorite
  });

  title.html(noteTitle); //Not sure if this should be "noteTitle" Also fix callback if so! ^^^ I guess it doesn't matter!?! ^^^
  button.html('add to Favorite');

  noteContainer.append(img, title, button);
  return noteContainer;
};

// POST Section

const displayNewNote = (note) => {
  const title = note.note_title;
  const id = note.note_id;
  const is_favorite = note.is_favorite;
  const newNote = noteTemplate(title, id, is_favorite);
  $('.content-note').prepend(newNote);
  $('input').val('');
};

const addNoteFail = (response) => {
  alert('Note Post Failed');
};


$('button[type="submit"]').on('click', function(event) {
  event.preventDefault(); // prevent the Browser from refreshing
  const noteTitle = $('input[name="note_title"]').val();

  $.ajax({
    url: '/add', 
    method: 'POST', 
    data: {
      note_title: noteTitle
    }
  })
  .then(displayNewNote)
  .catch(addNoteFail);
});;


// DELETE Section

const removeNoteOnDelete = (note) => {
  const id = note.note_id;
  $(`.all-notes .note [data-id=${id}]`).remove();
  return location.reload();
}

const removeNoteFailed = () => {
  alert('Note deletion unsuccessful.');
};


$('.all-notes .note button').on('click', function() {
  const id = $(this).attr('data-id');

  $.ajax({
    url: '/delete/' + id, 
    method: 'DELETE'
  })
  .then(removeNoteOnDelete)
  .catch(removeNoteFailed); 
});;


// FAVORITE OR UNFAVORITE NOTE

const addNoteToFavorite = (note) => {
  const id = note.note_id;
  $(`#${id}`).remove();
  return location.reload();
}

const addNoteToFavoriteFail = () => {
  alert('Failed to add note to favorites list');
}

$(document).on('click', '.favorites', function() {

  const id = $(this).attr('data-id');
  const value = $(this).attr('date-state');
  let condition = value === '0' ? false : true;
  
  $.ajax({
    url: `/${id}/${!condition}`,
    method: 'PUT'
  })
  .then(addNoteToFavorite)
  .catch(addNoteToFavoriteFail);
  
});




 