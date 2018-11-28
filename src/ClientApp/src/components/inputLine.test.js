import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { InputLine } from './InputLine';

describe("InputLine Suite", function () {

    it("ensures that stack starts out with a zero", function () {
        configure({ adapter: new Adapter() })

        const wrapper = shallow(<InputLine />);
        const instance = wrapper.instance();

        expect(instance.get()).toBe("0");
    });

    it("ensures that getting a previously set value works", function () {
        configure({ adapter: new Adapter() })

        const wrapper = shallow(<InputLine />);
        const instance = wrapper.instance();

        var value = "1234.56";

        expect(instance.set(value)).toBe(value);
        expect(instance.get()).toBe(value);
    });

});
