function Team (props) {
  return (
    <div className='w-1/2 mb-4 px-2'>
      <div className='container py-4 px-6 border border-gray-200 rounded leading-tight'>
        <p className='text-lg'>Team 1</p>
        <div className='w-full mt-2 divide-y divide-gray-100'>
          {props.players.map((player, idx) => {
            return (
              <div key={idx} className='block w-full py-2'>
                <span>{player.name}</span>
                {props.ratingSystem !== 'None' && (
                  <span className='float-right'>{player.rating}</span>
                )}
              </div>
            )
          })}
        </div>
        {props.ratingSystem !== 'None' && (
          <div className='w-full pt-2 text-gray-400'>
            <span>Team Rating</span>
            <span className='float-right'>
              {props.players.reduce((total, player) => {
                return total + +player.rating
              }, 0)}
            </span>
          </div>)}
      </div>
    </div>
  )
}

export default Team
