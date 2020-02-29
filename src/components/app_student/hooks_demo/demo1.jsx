import React, { useState, Fragment } from 'react'

function Counter(props) {
  const [count, setState] = useState(0)
  return (
    <Fragment>
      <div>Counter: {count}</div>
      <button onClick={() => setState(count + 1)}>Increase</button>
    </Fragment>
  )
}

export default Counter