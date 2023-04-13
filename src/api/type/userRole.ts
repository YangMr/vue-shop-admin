export interface LoginRole {
  username: string
  password: string
}

export interface UpdatePasswordRole {
  oldpassword: string
  password: string
  repassword: string
}
