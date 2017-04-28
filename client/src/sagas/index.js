import watchAuth from './auth';

export default function* mainSaga() {
  yield [
    watchAuth()
  ]
}