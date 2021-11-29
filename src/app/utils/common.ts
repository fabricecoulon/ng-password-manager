export function fixedEncodeURIComponent(astr: string): string {
    return encodeURIComponent(astr).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
}