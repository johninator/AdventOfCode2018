#include <emscripten/bind.h>

using namespace emscripten;

float sayHi() {
    return 5;
}

EMSCRIPTEN_BINDINGS(my_module) {
    function("sayHi", &sayHi);
}