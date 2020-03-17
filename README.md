# front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### issues

- `/services` 폴더로 뺀 `API Service` 에서 `const apiClient` 로 새로 정의하니 `axios.defaults.headers.common['Authorization'] = userData.accessToken` 인식을 하지 못함 그래서 `main.js`에  `axios.defaults.baseURL = 'http://52.78.166.10:8000'` 로 추가함