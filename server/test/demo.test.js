/**
 * @description 测试用例
 * @author tannnb
 */


function sum(a, b) {
    return a + b
}

test('10 + 20 测试', () => {
    expect(sum(10, 20)).toBe(30)
})