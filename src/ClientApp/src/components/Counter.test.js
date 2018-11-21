import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { Counter } from './Counter';

describe("Counter Suite", function () {

  it("simulates clicking the button three times and verifies the state", function () {
    configure({ adapter: new Adapter() })

    var wrapper = shallow(<Counter />);

    const theButton = wrapper.find('button');

    expect(wrapper.state().currentCount).toBe(0);

    theButton.simulate('click');
    expect(wrapper.state().currentCount).toBe(1);

    theButton.simulate('click');
    expect(wrapper.state().currentCount).toBe(2);

    theButton.simulate('click');
    expect(wrapper.state().currentCount).toBe(3);
  });

  it('calls the increment counter function directly three times and verifies the state', () => {
    configure({ adapter: new Adapter() })
    
    const wrapper = shallow(<Counter />);

    const instance = wrapper.instance();

    expect(wrapper.state().currentCount).toBe(0);
    
    instance.incrementCounter();
    expect(wrapper.state().currentCount).toBe(1);
    
    instance.incrementCounter();
    expect(wrapper.state().currentCount).toBe(2);

    instance.incrementCounter();
    expect(wrapper.state().currentCount).toBe(3);
  });

});
