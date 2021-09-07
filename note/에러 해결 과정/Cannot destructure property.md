# error: Cannot destructure property

> ✔ 과제를 풀면서 발생했던 에러와 해결 과정을 기록합니다.

- 이미지 상세보기를 눌렀을 때 **무한 로딩**되는 문제가 생겼다! 어떤 에러인지 확인해보니 다음과 같았다.

```
ImageInfo.js:30 Uncaught (in promise) TypeError: Cannot destructure property 'name' of 'catDetail' as it is undefined.
```

- 즉 이때 발생한 에러는, `catDetail`이 `undefined`가 되어 Cannot destructure, 즉 **구조 분해 할당을 실행할 수 없다**는 에러이다. 
- 💡 [**구조분해할당이란...**](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

#### 일단 코드를 한번 보자🤔

```js
// ImageInfo.js
const catDetail = this.data.info.data;
const { name, url, temperament, origin } = catDetail;
```

- 이때 `this.data.info.data`가 제대로 호출되지 않아 undefined가 되었고, 따라서 undefined인 catDetail로부터 구조분해할당을 실행하려니 에러가 발생한 것이다. 

- 따라서 이러한 무한 로딩 에러를 해결하기 위해 다음과 같이 빈 객체 `{}`를 `catDetail`에 디폴트로 제공하였다.

- 참고로, [**구조분해할당은 할당할 값이 없으면 자동으로 undefined로 취급**](https://ko.javascript.info/destructuring-assignment)된다.

  > 예를 들어서...
  >
  > ```js
  > let [firstName, surname] = [];
  > console.log(firstName, surname);	// 에러 없이 undefined undefined가 실행됨
  > ```

- 따라서 `Provide a default for your item`! 
  즉, `this.data.info.data`가 undefined일 경우 catDetail에 빈 객체 `{}`를 디폴트로 주고, 
  `{ name, url, temperament, origin }`에는 구조분해할당의 기본값 특징에 의해 `undefined`가 할당된다.

  ```js
  // ImageInfo.js
  const catDetail = this.data.info.data || {};
  const { name, url, temperament, origin } = catDetail;
  ```

  > 💡[**자바스크립트의 `||`에 대하여**](https://ko.javascript.info/logical-operators)
  >
  > - `||`는 첫번째 truthy를 찾아 반환한다!
  > - 따라서 `this.data.info.data`가 `undefined`, 즉 falsy값일 경우, `catDetail = {};`이 된다.

- 실행했더니 다음과 같이 `무한 로딩` 문제가 해결되고 화면이 출력되었다.

![image](https://user-images.githubusercontent.com/67737432/132355169-90308163-059b-4e92-b0ed-52ba38966501.png)

- 그런데 조금 보기 안좋아서..ㅎㅎ 좀 더 구체적으로 설정해주었다.

- ```js
  // ImageInfo.js
  const catDetail = this.data.info.data || { name: "정보없음", url: "정보없음", temperament: "정보없음", origin: "정보없음" };
  const { name, url, temperament, origin } = catDetail;
  ```

- 최종적으로 해결된 화면은 다음과 같다!
  이제는 `this.data.info.data`가 undefined가 되더라도 더이상 화면이 무한 로딩되지 않고 `정보없음`을 출력하며 종료된다.

![image](https://user-images.githubusercontent.com/67737432/132355635-11c89048-f2f8-4299-b64a-2797f135db66.png)

