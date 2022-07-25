# Test project for Mpharma with react -typescript

## Specification
 - Project was built with react typescript
 - Antd and tailwind was used for UI
 - Redux toolkit for state management with state cached in local storage
 - Unit test with react-testing-library and jest


## Process to run development server
 - Build local assets
```
 $ yarn make:all
```
- Start react dev server
```
yarn start
```

#### NB: If yarn make:images is not run there will be errors thrown


## Testing code
#### NB: Due to time the code may have a low code coverage for test but I took time to write test for my redux slice and some few components

- Run test

```
$ yarn make:all
$ yarn test
```

## Meaning of scrips

- Perform lint fix in codes
```
$ yarn lint
```
- Build Svg assets
```
$ yarn make:svg
```
- Build local images
```
$ yarn make:images
```
- Build all local assets and perform lint

``` bash
$ yarn make:all
```

## Run with docker

- Run from remote docker registry
```
$ docker run -p 8080:8080 sarptom/mpharma-test:latest
```
- Build and run locally

```
$ docker build -t <image_name> .
$ docker run -p 8080:8080 <image_name>
```



