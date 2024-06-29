import { currentUser } from "@clerk/nextjs/server"
import { db } from "./db"

export const checkUser = async () => {
    const user = await currentUser()
    // check for current logged in clerkUser
    if (!user) {
        return null
    }
    // check if the user is already in the database
    const loggedInUser = await db.user.findUnique({
        where: {
            clerkId: user.id
        }
    })
1
    // if user is in database, return user
    if (loggedInUser) {
        return loggedInUser;
    }
    // if not in database create user
    const newUser = await db.user.create({
        data: {
            clerkId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl,
        }
    })

    return newUser

}