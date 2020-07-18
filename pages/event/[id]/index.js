import {useRouter} from 'next/router'
import Router from 'next/router'

import Link from 'next/link'

const Event = () => {
    const router = useRouter();
    const {id} = router.query

    return (
        <div>
            <Link href="/events">
          <a>events</a>
        </Link>
            event: {id};
        </div>
    )
}

export default Event;