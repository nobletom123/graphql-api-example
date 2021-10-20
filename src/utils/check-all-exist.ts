export const checkAllExist = <DataSetElement>(
  dataSet: DataSetElement[] = [],
  perElementFunction: (input: DataSetElement) => boolean
) => {
  return dataSet.every((dataSetElement) => perElementFunction(dataSetElement));
};
