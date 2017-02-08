from rdflib import Graph, URIRef
from rdflib.namespace import SKOS
import json
import sys

SKOS_XL_LABEL = URIRef(u'http://www.w3.org/2008/05/skos-xl#literalForm')

data = []

def parseLang(loc):
    g = Graph()
    g.parse(location = loc + '.skos.nt', format = 'n3')
    for s,p,o in g:
        if p == SKOS_XL_LABEL and o.language == 'en':
            data.append({'url': loc, 'label': o})

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print 'Missing output file argument'
        sys.exit(1)

    g = Graph()
    g.parse(location = 'http://id.loc.gov/vocabulary/iso639-1.skos.nt', format = 'n3')

    for s,p,o in g:
        if p == SKOS.hasTopConcept:
            lg = Graph()
            parseLang(o)

    with open(sys.argv[1], 'w') as out:
        json.dump(data, out)