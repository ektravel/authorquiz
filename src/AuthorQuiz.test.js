import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CANCELLED } from 'dns';
Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: ['A Gentelman in Moscow', 'Rules of Civility', 'Wild: From Lost to Found on the Pacific Crest Trail', 'Torch', 'The Prince and the Pauper', 'The Book of Laughter and Forgetting'],
    author: {
      name: 'Mark Twain',
      imageUrl: 'images/authors/marktwain.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['The Adventures of Tom Sawyer', 'The Prince and the Pauper', 'Life on the Mississippi']
    },
  },
  highlight: 'none'
}

describe("Author Quiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => { }} />, div);
  });

  describe("When no answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => { }} />);
    });
    it("should have no background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
    });
  });

  describe("When the wrong answer has been selected", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, { highlight: 'wrong' }))} onAnswerSelected={() => { }} />);
    });
    it("should have a red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
    });
  });

  describe("When the correct answer has been selected", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, { highlight: 'correct' }))} onAnswerSelected={() => { }} />);
    });
    it("should have a green background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
    });
  });

  describe("When the fist answer is selected", () => {
    let wrapper;
    const handleAnswerSelected = jest.fn();
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected}/>);
      wrapper.find('.answer').first().simulate('click');
    });

    it("onAnswerSelected should be called", () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it("should receive A Gentelman in Moscow", () => {
      expect(handleAnswerSelected).toHaveBeenCalledWith("A Gentelman in Moscow");
    });
    
  });

});
