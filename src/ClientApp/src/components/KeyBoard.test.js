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


    it("ensures that limitNumber works correctly", function () {
        configure({ adapter: new Adapter() })

        const wrapper = shallow(<KeyBoard />);
        const instance = wrapper.instance();

        // no limiting occurs tests
        expect(instance.limitNumber("1")).toBe("1");
        expect(instance.limitNumber("-1")).toBe("-1");
        expect(instance.limitNumber(".1")).toBe(".1");
        expect(instance.limitNumber("-.1")).toBe("-.1");
        expect(instance.limitNumber(".0123")).toBe(".0123");
        expect(instance.limitNumber("-.0123")).toBe("-.0123");
        expect(instance.limitNumber("1.1")).toBe("1.1");
        expect(instance.limitNumber("-1.1")).toBe("-1.1");
        expect(instance.limitNumber("1.101")).toBe("1.101");
        expect(instance.limitNumber("-1.101")).toBe("-1.101");
        expect(instance.limitNumber("123456789")).toBe("123456789");
        expect(instance.limitNumber("1234.56789")).toBe("1234.56789");
        expect(instance.limitNumber(".123456789")).toBe(".123456789");
        expect(instance.limitNumber("-.123456789")).toBe("-.123456789");
        expect(instance.limitNumber("-123456789")).toBe("-123456789");
        expect(instance.limitNumber("-1234.56789")).toBe("-1234.56789");
        expect(instance.limitNumber("-.123456789")).toBe("-.123456789");
        expect(instance.limitNumber("1234567890123456789")).toBe("1234567890123456789");
        expect(instance.limitNumber("12345678900000")).toBe("12345678900000"); 
        expect(instance.limitNumber("3.3333333333333333333333333333")).toBe("3.33333333");
        expect(instance.limitNumber("-3.3333333333333333333333333333")).toBe("-3.33333333");
        expect(instance.limitNumber(".000000033")).toBe(".000000033"); 
        expect(instance.limitNumber("-.000000033")).toBe("-.000000033"); 

        // limiting occurs tests
        expect(instance.limitNumber("1234.567891")).toBe("1234.56789");
        expect(instance.limitNumber(".1234567891")).toBe(".123456789");
        expect(instance.limitNumber("-.1234567891")).toBe("-.123456789");
        expect(instance.limitNumber("-1234.567891")).toBe("-1234.56789");
        expect(instance.limitNumber("-.1234567891")).toBe("-.123456789");
        expect(instance.limitNumber("1234.56789123")).toBe("1234.56789");
        expect(instance.limitNumber(".123456789123")).toBe(".123456789");
        expect(instance.limitNumber("-.123456789123")).toBe("-.123456789");
        expect(instance.limitNumber("-1234.56789123")).toBe("-1234.56789");
        expect(instance.limitNumber("-.123456789123")).toBe("-.123456789");
        expect(instance.limitNumber("123456789.1")).toBe("123456789");
        expect(instance.limitNumber("-123456789.1")).toBe("-123456789");
        expect(instance.limitNumber("123456789.9")).toBe("123456790");
        expect(instance.limitNumber("-123456789.9")).toBe("-123456790");        
        expect(instance.limitNumber("12345678900000.00000")).toBe("12345678900000");         
        expect(instance.limitNumber("12345678900000.000001")).toBe("12345678900000"); 
        expect(instance.limitNumber(".0000000033")).toBe(".000000003"); 
        expect(instance.limitNumber("-.0000000033")).toBe("-.000000003");
    });

});
