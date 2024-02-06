import {Link} from 'components/lib'

function NotFoundScreen() {
  return (
    <div
      style={{
        height: '100%',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        Sorry... nothing here. <Link to="/list">Go home</Link>
      </div>
    </div>
  )
}

export default NotFoundScreen
