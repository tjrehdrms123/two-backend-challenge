/**
 * 고유한 Value 추출 / GroupBy
 * @param obj 대상 객체
 * @param key key 값
 * @param value value 값
 * @returns 
 */
export function uniqueValue(obj,key,value){
  const result = Object.values(obj.reduce((accumulator, t) => {
    const v = t[value];
    if (v && !accumulator[v]) {
      accumulator[v] = { [key]:v };
    }
    return accumulator;
  }, {}));
  return result;
}

/**
 * key 값 컬럼과 맞춰주기
 * @param obj 대상 객체 배열
 * @param keyMap 속성을 매핑할 키의 객체
 * @returns 변환된 배열
 */
export function keyMatchColumn<T>(obj: T[], keyMap: Record<string, keyof T>): T[] {
  return obj.map(t => {
    const newObj: Partial<T> = {};
    for (const [originalKey, newKey] of Object.entries(keyMap)) {
      newObj[newKey] = t[originalKey];
    }
    return newObj as T;
  });
}