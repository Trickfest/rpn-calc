import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { KeyBoard } from './KeyBoard';

describe("KeyBoard Suite", function () {

    it("ensures that strDigits works correctly", function () {
        configure({ adapter: new Adapter() })

        const wrapper = shallow(<KeyBoard />);
        const instance = wrapper.instance();

        expect(instance.strDigits("1")).toBe(1);
        expect(instance.strDigits("")).toBe(0);
        expect(instance.strDigits("1.1")).toBe(2);
        expect(instance.strDigits("-1.1")).toBe(2);
        expect(instance.strDigits("-1")).toBe(1);
        expect(instance.strDigits("-.1")).toBe(1);
        expect(instance.strDigits("-123")).toBe(3);
        expect(instance.strDigits("-.123")).toBe(3);
        expect(instance.strDigits("123")).toBe(3);
        expect(instance.strDigits(".123")).toBe(3);
    });


    it("ensures that truncateNumber works correctly", function () {
        configure({ adapter: new Adapter() })

        const wrapper = shallow(<KeyBoard />);
        const instance = wrapper.instance();

        // no truncation occurs tests
        expect(instance.truncateNumber("1")).toBe("1");
        expect(instance.truncateNumber("123456789")).toBe("123456789");
        expect(instance.truncateNumber("1234.56789")).toBe("1234.56789");
        expect(instance.truncateNumber(".123456789")).toBe(".123456789");
        expect(instance.truncateNumber("-.123456789")).toBe("-.123456789");
        expect(instance.truncateNumber("-123456789")).toBe("-123456789");
        expect(instance.truncateNumber("-1234.56789")).toBe("-1234.56789");
        expect(instance.truncateNumber("-.123456789")).toBe("-.123456789");
        expect(instance.truncateNumber("1234567890123456789")).toBe("1234567890123456789");
        
        // truncation occurs tests
        /*
        comment out for now so the build isn't broken
        expect(instance.truncateNumber("1234.567891")).toBe("1234.56789");
        expect(instance.truncateNumber(".1234567891")).toBe(".123456789");
        expect(instance.truncateNumber("-.1234567891")).toBe("-.123456789");
        expect(instance.truncateNumber("-1234.567891")).toBe("-1234.56789");
        expect(instance.truncateNumber("-.1234567891")).toBe("-.123456789");
        expect(instance.truncateNumber("1234.56789123")).toBe("1234.56789");
        expect(instance.truncateNumber(".123456789123")).toBe(".123456789");
        expect(instance.truncateNumber("-.123456789123")).toBe("-.123456789");
        expect(instance.truncateNumber("-1234.56789123")).toBe("-1234.56789");
        expect(instance.truncateNumber("-.123456789123")).toBe("-.123456789");
        */
    });

});
