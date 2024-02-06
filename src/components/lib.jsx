import './lib.css'
import * as React from 'react'
import {Link as RouterLink} from '@remix-run/react'
import {Dialog as ReachDialog} from '@reach/dialog'
import {FaSpinner} from 'react-icons/fa'

const CircleButton = React.forwardRef(({className, ...props}, ref) => (
  <button
    ref={ref}
    className={className ? `CircleButton ${className}` : 'CircleButton'}
    {...props}
  />
))

const BookListUL = React.forwardRef(({className, ...props}, ref) => (
  <ul
    ref={ref}
    className={className ? `BookListUL ${className}` : 'BookListUL'}
    {...props}
  />
))

const Spinner = React.forwardRef(({className, ...props}, ref) => (
  <FaSpinner
    ref={ref}
    className={className ? `Spinner ${className}` : 'Spinner'}
    {...props}
  />
))
Spinner.defaultProps = {
  'aria-label': 'loading',
}

const Button = React.forwardRef(({variant, className, ...props}, ref) => (
  <button
    ref={ref}
    className={['Button', className, variant].filter(Boolean).join(' ')}
    {...props}
  />
))

const Input = React.forwardRef(({className, ...props}, ref) => (
  <input
    ref={ref}
    className={className ? `Input field ${className}` : 'Input field'}
    {...props}
  />
))
const Textarea = React.forwardRef(({className, ...props}, ref) => (
  <textarea
    ref={ref}
    className={className ? `field ${className}` : 'field'}
    {...props}
  />
))

const Dialog = React.forwardRef((props, ref) => (
  <ReachDialog className="Dialog" ref={ref} {...props} />
))

const FormGroup = React.forwardRef(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={className ? `FormGroup ${className}` : 'FormGroup'}
    {...props}
  />
))

function FullPageSpinner() {
  return (
    <div className="FullPageSpinner">
      <Spinner />
    </div>
  )
}

const Link = React.forwardRef(({className, ...props}, ref) => (
  <RouterLink
    ref={ref}
    className={className ? `Link ${className}` : 'Link'}
    {...props}
  />
))

function ErrorMessage({className, error, variant = 'stacked', ...props}) {
  return (
    <div
      role="alert"
      className={['ErrorMessage', className, variant].filter(Boolean).join(' ')}
      {...props}
    >
      <span>There was an error: </span>
      <pre>{error.message}</pre>
    </div>
  )
}

function FullPageErrorFallback({error}) {
  return (
    <div role="alert" className="FullPageErrorFallback">
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export {
  FullPageErrorFallback,
  ErrorMessage,
  CircleButton,
  BookListUL,
  Spinner,
  Button,
  Input,
  Textarea,
  Dialog,
  FormGroup,
  FullPageSpinner,
  Link,
}
