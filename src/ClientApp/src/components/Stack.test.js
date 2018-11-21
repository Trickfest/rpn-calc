import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { Stack } from './Stack';

describe("Stack Suite", function () {

  it("pushes a value, pops it and verifies result", function () {
    configure({ adapter: new Adapter() })

    const wrapper = shallow(<Stack />);

    const instance = wrapper.instance();
    
    instance.push(100);

    expect(instance.pop()).toBe(100);
  });

  it('pushes a value, swaps it and verifies the result', () => {
    const wrapper = shallow(<Stack />);

    const instance = wrapper.instance();
    
    instance.push(100);

    expect(instance.swap(200)).toBe(100);

    expect(instance.pop()).toBe(200);
  });

});
