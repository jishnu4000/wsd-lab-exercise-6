const ValidationMessage = ({ fieldName, errorMsg, validMsg }) => {
  return (
    <div>
    {
      fieldName ? (
        errorMsg ? (
          <p className="text-red-600 font-semibold text-sm mt-1 mx-3">
            {errorMsg}
          </p>
        ) : (
          <p className="text-green-600 font-semibold text-sm mt-1 mx-3">
            {validMsg}
          </p>
        )
      ) : (
        errorMsg && (
          <p className="text-red-600 font-semibold text-sm mt-1 mx-3">
            {errorMsg}
          </p>
        )
      )
    }
    </div>
  )
}

export default ValidationMessage