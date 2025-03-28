{
  "sksl": {
    "entrypoint": "polygon_fragment_main",
    "shader": "// This SkSL shader is autogenerated by spirv-cross.\n\nfloat4 flutter_FragCoord;\n\nuniform float count_triangles;\nuniform vec2 triangle_points[1000];\n\nvec4 fragColor;\n\nvec2 FLT_flutter_local_FlutterFragCoord()\n{\n    return flutter_FragCoord.xy;\n}\n\nbool FLT_flutter_local_puntoEnTriangulo(vec2 p, vec2 v0, vec2 v1, vec2 v2)\n{\n    float d1 = ((v1.y - v2.y) * (p.x - v2.x)) + ((v2.x - v1.x) * (p.y - v2.y));\n    float d2 = ((v2.y - v0.y) * (p.x - v0.x)) + ((v0.x - v2.x) * (p.y - v0.y));\n    float d3 = ((v0.y - v1.y) * (p.x - v1.x)) + ((v1.x - v0.x) * (p.y - v1.y));\n    return ((d1 >= 0.0) && (d2 >= 0.0)) && (d3 >= 0.0);\n}\n\nvoid FLT_main()\n{\n    vec2 coord_pixel = FLT_flutter_local_FlutterFragCoord();\n    vec4 color = vec4(0.0);\n    for (int i = 0; i < 1000; i++)\n    {\n        if (float(i) >= count_triangles)\n        {\n            break;\n        }\n        vec2 param = coord_pixel;\n        vec2 param_1 = triangle_points[i * 3];\n        vec2 param_2 = triangle_points[(i * 3) + 1];\n        vec2 param_3 = triangle_points[(i * 3) + 2];\n        if (FLT_flutter_local_puntoEnTriangulo(param, param_1, param_2, param_3))\n        {\n            color = vec4(1.0);\n        }\n    }\n    fragColor = color;\n}\n\nhalf4 main(float2 iFragCoord)\n{\n      flutter_FragCoord = float4(iFragCoord, 0, 0);\n      FLT_main();\n      return fragColor;\n}\n",
    "stage": 1,
    "uniforms": [
      {
        "array_elements": 0,
        "bit_width": 32,
        "columns": 1,
        "location": 0,
        "name": "count_triangles",
        "rows": 1,
        "type": 10
      },
      {
        "array_elements": 1000,
        "bit_width": 32,
        "columns": 1,
        "location": 1,
        "name": "triangle_points",
        "rows": 2,
        "type": 10
      }
    ]
  }
}