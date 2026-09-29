import builtins
import io
import sys
import traceback


_ORIGINAL_INPUT = builtins.input


def _short_traceback(exc):
    lines = traceback.format_exception(type(exc), exc, exc.__traceback__)
    cleaned = [line.rstrip() for line in lines if line and line.strip()]
    if not cleaned:
        return str(exc)

    last_line = cleaned[-1].strip()
    if len(cleaned) > 1:
        previous_line = cleaned[-2].strip()
        if previous_line and not previous_line.startswith('Traceback') and not previous_line.startswith('File "'):
            return f"{previous_line}\n{last_line}"
    return last_line


def run_test(codigo, entrada="", chamada=None):
    namespace = {"__name__": "__main__"}
    original_input = builtins.input
    original_stdout = sys.stdout
    original_stderr = sys.stderr
    stdout_buffer = io.StringIO()
    stderr_buffer = io.StringIO()
    lines = entrada.split("\n") if entrada is not None else []
    index = 0

    def safe_input(prompt=""):
        nonlocal index
        if index >= len(lines):
            raise EOFError("EOF when reading a line")
        value = lines[index]
        index += 1
        return value

    try:
        builtins.input = safe_input
        sys.stdout = stdout_buffer
        sys.stderr = stderr_buffer

        exec(codigo, namespace)

        if chamada is not None:
            resultado = eval(chamada, namespace)
            print(resultado)

        stdout = stdout_buffer.getvalue()
        stderr = stderr_buffer.getvalue()
        return {"stdout": stdout, "stderr": stderr, "ok": True}
    except BaseException as exc:  # noqa: BLE001 - intentionally captures all Python exceptions.
        stdout = stdout_buffer.getvalue()
        stderr = stderr_buffer.getvalue()
        stderr_text = _short_traceback(exc)
        if stderr:
            stderr_text = f"{stderr.rstrip()}\n{stderr_text}"
        return {"stdout": stdout, "stderr": stderr_text, "ok": False}
    finally:
        builtins.input = original_input
        sys.stdout = original_stdout
        sys.stderr = original_stderr
