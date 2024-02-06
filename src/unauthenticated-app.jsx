import './unauthenticated-app.css'
import * as React from 'react'
import {Input, Button, Spinner, FormGroup, ErrorMessage} from './components/lib'
import {Modal, ModalContents, ModalOpenButton} from './components/modal'
import {Logo} from './components/logo'
import {useFetcher} from '@remix-run/react'

function LoginForm({intent, submitButton}) {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method="post" className="LoginForm">
      <input type="hidden" name="intent" value={intent} />
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" name="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" name="password" />
      </FormGroup>
      <div>
        {React.cloneElement(
          submitButton,
          {type: 'submit'},
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          fetcher.state != 'idle' ? <Spinner style={{marginLeft: 5}} /> : null,
        )}
      </div>
      {fetcher.data?.error ? <ErrorMessage error={fetcher.data.error} /> : null}
    </fetcher.Form>
  )
}

function UnauthenticatedApp() {
  return (
    <div className="UnauthenticatedApp">
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div className="modal-buttons">
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              intent="login"
              submitButton={<Button variant="primary">Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              intent="register"
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}

export default UnauthenticatedApp
