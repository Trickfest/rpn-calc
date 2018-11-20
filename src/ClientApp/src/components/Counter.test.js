import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { Counter } from './Counter';

describe("Counter Suite", function () {

  it("Click Test", function () {
    configure({ adapter: new Adapter() })

    var wrapper = shallow(<Counter />);

    const theButton = wrapper.find('button');

    theButton.simulate('click');
    expect(wrapper.state().currentCount).toBe(1);

    theButton.simulate('click');
    expect(wrapper.state().currentCount).toBe(2);

    theButton.simulate('click');
    expect(wrapper.state().currentCount).toBe(3);
  });

});
