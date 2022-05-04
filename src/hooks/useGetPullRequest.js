import { useState, useEffect } from 'react'

/**
 * Just a mock hook to to return some kind live result fetch
 */
const useGetPullRequest = () => {
  const [pullRequestAmount, setPullRequestAmount] = useState({
    offset: 0,
    current: 15,
  })

  useEffect(() => {
    const getNextPullRequest = setInterval(() => {
      setPullRequestAmount({
        offset: pullRequestAmount.offset + 1,
        current: pullRequestAmount.current + 1,
      })
    }, 3000)
    return () => clearInterval(getNextPullRequest)
  }, [pullRequestAmount])

  return {
    current: pullRequestAmount.current,
    offset: pullRequestAmount.offset,
  }
}

export default useGetPullRequest
