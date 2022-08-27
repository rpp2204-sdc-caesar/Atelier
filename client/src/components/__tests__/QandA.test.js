//import renderer from 'react-test-renderer';
import React from 'react'
import {render, screen} from '@testing-library/react'


import QandA from '../QandA.jsx';
// import ShallowRenderer from 'react-test-renderer/shallow';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

it("renders correctly", () => {
  const tree = shallow(<QandA />);
  expect(tree).toMatchSnapshot();
});

it("renders QUESTIONS & ANSWERS header", () => {
  const wrapper = shallow(<QandA />);
  const header = <div>QUESTIONS & ANSWERS</div>;
  expect(wrapper.contains(header)).toEqual(true);
});
