// interface dataType {
//   firstName: string
//   lastName: string
// }
// function getFullName(data: dataType) {
//   return `${data.firstName} ${data.lastName}`
// }
// getFullName({ firstName: 1, lastName: 2 })

// // getFullName({ firstName: 'jaos', lastName: 'qa' })
// getFullName({ age: 1, phone: '17802901998' })

// interface Info {
//   readonly firstName: string
//   readonly lastName?: string
// }

// function getFullName(data: Info) {
//   data.firstName = '123'
//   return `${data.firstName} ${data.lastName}`
// }

// getFullName({ firstName: '1', lastName: '2' })

// interface Role {
//   readonly name: string
//   readonly age: number
// }

// const role: Role = {
//   name: 'jack',
//   age: 100
// }

// role.name = 'rose'

// interface Test {
//   (num1: number, num2: number): number
// }

// const test: Test = (num1, num2) => {
//   return num1 + num2 + 'a'
// }
// test(1, 2)

// interface TestA {
//   name: string
// }

// interface TestB extends TestA {
//   age: string
// }

// const obj: TestB = {
//   age: '123',
//   name: '123'
// }
// console.log(obj)

interface login {
  username: string
  password: string
}
const obj = { password: '1' }

function a({ name }, str: login) {
  console.log(name)
  console.log(str)
}

a({ name: 'jack' }, obj)

export {}
