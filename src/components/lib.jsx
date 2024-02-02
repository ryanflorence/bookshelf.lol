import * as React from 'react'
import {Link as RouterLink} from '@remix-run/react'
import {keyframes} from '@emotion/core'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import {Dialog as ReachDialog} from '@reach/dialog'
import {FaSpinner} from 'react-icons/fa'

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

const CircleButton = React.forwardRef(({css, ...props}, ref) => (
  <button
    ref={ref}
    css={{
      borderRadius: '30px',
      padding: '0',
      width: '40px',
      height: '40px',
      lineHeight: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: colors.base,
      color: colors.text,
      border: `1px solid ${colors.gray10}`,
      cursor: 'pointer',
      ...css,
    }}
    {...props}
  />
))

const BookListUL = React.forwardRef(({css, ...props}, ref) => (
  <ul
    ref={ref}
    css={{
      listStyle: 'none',
      padding: '0',
      display: 'grid',
      gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))',
      gridGap: '1em',
      ...css,
    }}
    {...props}
  />
))

const Spinner = React.forwardRef(({css, ...props}, ref) => (
  <FaSpinner
    ref={ref}
    css={{
      animation: `${spin} 1s linear infinite`,
      ...css,
    }}
    {...props}
  />
))
Spinner.defaultProps = {
  'aria-label': 'loading',
}

const buttonVariants = {
  primary: {
    background: colors.indigo,
    color: colors.base,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
}
const Button = React.forwardRef(({variant, css, ...props}, ref) => (
  <button
    ref={ref}
    css={{
      padding: '10px 15px',
      border: '0',
      lineHeight: '1',
      borderRadius: '3px',
      ...(buttonVariants[variant] || buttonVariants.primary),
      ...css,
    }}
    {...props}
  />
))

const inputStyles = {
  border: '1px solid #f1f1f4',
  background: '#f1f2f7',
  padding: '8px 12px',
}

const Input = React.forwardRef(({css, ...props}, ref) => (
  <input
    ref={ref}
    css={{
      borderRadius: '3px',
      ...inputStyles,
      ...css,
    }}
    {...props}
  />
))
const Textarea = React.forwardRef(({css, ...props}, ref) => (
  <textarea
    ref={ref}
    css={{
      ...inputStyles,
      ...css,
    }}
    {...props}
  />
))

const Dialog = React.forwardRef(({css, ...props}, ref) => (
  <ReachDialog
    ref={ref}
    css={{
      maxWidth: '450px',
      borderRadius: '3px',
      paddingBottom: '3.5em',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
      margin: '20vh auto',
      [mq.small]: {
        width: '100%',
        margin: '10vh auto',
      },
      ...css,
    }}
    {...props}
  />
))

const FormGroup = React.forwardRef(({css, ...props}, ref) => (
  <div
    ref={ref}
    css={{
      display: 'flex',
      flexDirection: 'column',
    }}
    {...props}
  />
))

function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  )
}

const Link = React.forwardRef(({css, ...props}, ref) => (
  <RouterLink
    ref={ref}
    css={{
      color: colors.indigo,
      ':hover': {
        color: colors.indigoDarken10,
        textDecoration: 'underline',
      },
    }}
    {...props}
  />
))

const errorMessageVariants = {
  stacked: {display: 'block'},
  inline: {display: 'inline-block'},
}

function ErrorMessage({error, variant = 'stacked', ...props}) {
  return (
    <div
      role="alert"
      css={[{color: colors.danger}, errorMessageVariants[variant]]}
      {...props}
    >
      <span>There was an error: </span>
      <pre
        css={[
          {whiteSpace: 'break-spaces', margin: '0', marginBottom: -5},
          errorMessageVariants[variant],
        ]}
      >
        {error.message}
      </pre>
    </div>
  )
}

function FullPageErrorFallback({error}) {
  return (
    <div
      role="alert"
      css={{
        color: colors.danger,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
