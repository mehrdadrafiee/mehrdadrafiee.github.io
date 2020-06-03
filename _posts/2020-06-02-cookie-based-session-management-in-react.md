---
layout: post
title: Cookie Based Session Management In React
date: 2020-06-02
description: This post demonstrates managing user session based on parameters set in Cookies
keywords: react, session management, cookie
---
Often times you want to let your user know that their session is about to expire so they need to take an action to refresh their session. In this post we're discussing the approach where the session expiration gets set in the browser's cookie by the backend. We will use [Reactstrap modal][reactstrap-modal] to show a timer and ask user to take action.

Here are the steps we need to do:
- Get the expiration value from the Cookie
- Every 5 seconds checking to see if the expiration time is less than current time (in seconds)
- If step 2 is true, show the modal
- We give user 60 seconds to decide

{% highlight jsx %}
// src/App.js
...
import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const CHECK_EXPIRATION_INTERVAL = 5000
const EXPIRATION_WARNING_IN_SECONDS = 90

export const App = () => {
  const getSessionExpiration = () => {
    const expirationValue = document.cookie('session-expiration')

    return new Date(expirationValue)
  }

  const [showLogoutWarning, setShowLogoutWarning] = React.useState(false)
  const [expirationDate, setExpirationDate] = React.useState(getSessionExpiration())

  React.useEffect(() => {
    const timer = setInterval(handleShowLogoutWarning, CHECK_EXPIRATION_INTERVAL)

    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expirationDate])

  const handleShowLogoutWarning = () => {
    let secondsLeft = Math.round(
      Math.abs((expirationDate.getTime() - new Date().getTime()) / 1000)
    )

    if (expirationDate && secondsLeft < EXPIRATION_WARNING_IN_SECONDS) {
      setShowLogoutWarning(true)
    }
  }

  const handleSignOut = () => {
    window.location.replace('/account/logoff')
  }

  const handleExtendSession = async () => {
    setShowLogoutWarning((value) => !value)
    await fetchExpiration()

    setExpirationDate(getSessionExpiration())
  }

  return (
    {showLogoutWarning && (
      <Modal centered isOpen={showLogoutWarning} toggle={handleShowLogoutWarning}>
        <ModalHeader toggle={toggle}>Your session is about to end.</ModalHeader>
        <ModalBody>
          You've been inactive for a while. You may choose "Stay signed in" to continue or "Sign out" if you're done. For your security, we'll automatically sign you out in 60 seconds.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleExtendSession}>Stay signed in</Button>
          <Button color="secondary" onClick={handleSignOut}>Sign out</Button>
        </ModalFooter>
      </Modal>
    )
  )
}
{% endhighlight %}

So far so good. Notice that we hard coded _60 seconds_ in the `ModalBody`. Next we'll create a `Timer` component to count down and fire logout action when time is up.

{% highlight jsx %}
// src/App.js
...
import { Timer } from './components/Timer'

const COUNT_DOWN_START_IN_SECONDS = 60

export const App = () => {
  ...
  return (
    {showLogoutWarning && (
      <Modal centered isOpen={showLogoutWarning} toggle={handleShowLogoutWarning}>
        <ModalHeader toggle={toggle}>Your session is about to end.</ModalHeader>
        <Timer start={COUNT_DOWN_START_IN_SECONDS} onEnd={handleSignOut} />
        ...
      </Modal>
    )
  )
}
{% endhighlight %}

{% highlight jsx %}
// src/components/Timer.js
import React from 'react'

const COUNTER_INTERVAL = 1000

export function Timer({ start, onEnd }) {

  const [seconds, setSeconds] = React.useState(start)

  React.useEffect(() => {
    const timer = setInterval(() => setSeconds((count) => count - 1), COUNTER_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  if (seconds < 1) {
    onEnd()
  }

  return (
    <p>
      You've been inactive for a while. You may choose "Stay signed in" to
      continue or "Sign out" if you're done. For your security, we'll
      automatically sign you out in <strong>{seconds < 0 ? 0 : seconds}</strong> seconds.
    </p>
  )
}
{% endhighlight %}

[reactstrap-modal]: https://reactstrap.github.io/components/modals/
