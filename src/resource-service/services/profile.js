import { readProfileDB } from "../models/profile";

export async function readProfile(username) {
    return readProfileDB(username)
}