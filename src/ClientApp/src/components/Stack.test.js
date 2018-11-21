import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { Stack } from './Stack';

describe("Stack Suite", function () {

    it("ensures that stack starts out empty", function () {
        configure({ adapter: new Adapter() })

        const wrapper = shallow(<Stack />);

        const instance = wrapper.instance();

        expect(instance.pop()).toBe(null);
    });

    it("ensures that too many pops result in a null", function () {
        configure({ adapter: new Adapter() })

        const wrapper = shallow(<Stack />);

        const instance = wrapper.instance();

        instance.push(100);

        expect(instance.pop()).toBe(100);

        expect(instance.pop()).toBe(null);
    });
    
    it("ensures that a swap on an empty stack results in a null", function () {
        configure({ adapter: new Adapter() })

        const wrapper = shallow(<Stack />);

        const instance = wrapper.instance();

        expect(instance.swap(200)).toBe(null);
    });

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
