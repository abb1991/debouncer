const STATES = ['Alabama', 'Alaska', 'California', 'New York'];

input = document.getElementById('autocomplete');

const delayedList = debounce(searchStates, displayStates, 500);


input.addEventListener('input', (e) => {
  const result = e.target.value;
  delayedList(result);
});

function displayStates(states){
  let ul = $('#list'), results;
  if(ul.length === 0){
    ul = $('#autocomplete').after("<ul id='list'></ul>");
  } else {
    ul.children().remove();
  }
  results = $("#list");
  states.forEach( (state) => {
    let li = '<li>' + state + '</li>';
    results[0].append($(li)[0]);
  });
}


function debounce(search, display, delay){
  let timeout;
  return function() {
    clearTimeout(timeout);
    const args = arguments;
    timeout = setTimeout(function(){
      const states = search.apply(null, args);
      display.call(null, states);
    }, delay);
  }
}


function searchStates(stateInput){
   stateInput = stateInput.toUpperCase().trim();
   let filteredStates = STATES.filter((state) => {
    return state.toUpperCase().startsWith(stateInput);
  });

  // pass an empty array to displayStates rather than complete
  // list of all states if user inputs empty string
  if(STATES.length === filteredStates.length){
    filteredStates = [];
  }
  return filteredStates;
}

describe('search for a state', function() {
  it('should find a state', function() {
    let inputState = searchStates('Alaska');
    expect(inputState).toContain('Alaska');

  });

  it('should find a state starting with a white space', function() {
    let inputState = searchStates(' ALASKA');
    expect(inputState).toContain('Alaska');
  });

});

