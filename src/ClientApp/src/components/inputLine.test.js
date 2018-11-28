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

});
