export function printHelper(defragMatrix: Array<Array<number>>) {
  console.log(
    defragMatrix[0]
      .slice(0, 8)
      .map(s => `0${s}`.substr(-2))
      .join(",")
  );
  console.log(
    defragMatrix[1]
      .slice(0, 8)
      .map(s => `0${s}`.substr(-2))
      .join(",")
  );
  console.log(
    defragMatrix[2]
      .slice(0, 8)
      .map(s => `0${s}`.substr(-2))
      .join(",")
  );
  console.log(
    defragMatrix[3]
      .slice(0, 8)
      .map(s => `0${s}`.substr(-2))
      .join(",")
  );
  console.log(
    defragMatrix[4]
      .slice(0, 8)
      .map(s => `0${s}`.substr(-2))
      .join(",")
  );
  console.log(
    defragMatrix[5]
      .slice(0, 8)
      .map(s => `0${s}`.substr(-2))
      .join(",")
  );
  console.log(
    defragMatrix[6]
      .slice(0, 8)
      .map(s => `0${s}`.substr(-2))
      .join(",")
  );
  console.log(
    defragMatrix[7]
      .slice(0, 8)
      .map(s => `0${s}`.substr(-2))
      .join(",")
  );
}
