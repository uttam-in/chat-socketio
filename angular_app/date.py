import json
import redis
r = redis.Redis(host='192.168.99.102', port=6379, db=0)

user = {
"username":"mattu",
"chatid":"4394083fa71b4ce",
}
r.set("mattu",json.dumps(user))

date = r.get("mattu").decode("utf-8")
print(date)
