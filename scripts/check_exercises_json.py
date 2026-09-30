import json, glob, sys
files = glob.glob('src/modules/python/exercises/*.json')
any_err = False
for f in files:
    try:
        with open(f, encoding='utf8') as fh:
            json.load(fh)
        print('OK', f)
    except Exception as e:
        print('ERR', f, e)
        any_err = True
if any_err:
    sys.exit(1)
print('ALL_OK')
