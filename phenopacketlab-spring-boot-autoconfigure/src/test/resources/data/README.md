# README

The files in this folder are subsets of the real data files. 

- `geno.json` - complete GENO ontology.
- `hgnc_complete_set.txt` - test file with a few lines
- `hp.json` - Subset of HPO containing all complete HPO sub-hierarchies except for the `Phenotypic abnormality` sub-hierarchy,
  where only the ancestors of `Arachnodactyly` are present.
- `mondo.json` - MONDO module containing ancestors of `MONDO:0007038` *Achoo syndrome*.
- `phenotype.hpoa` - a file describing 2 non-existing diseases annotated by terms that are present in the `hp.json` above
- `so.json` - SO module containing descendents of `http://purl.obolibrary.org/obo/SO_0001537` *silent_mutation*.
- `uberon.json` - UBERON module containing ancestors of `UBERON:0000468` *multicellular organism*.
- `uo.json` - complete UO ontology.
- `drugcentral.csv` - 10 lines of the postprocessed DrugCentral CSV file.
- `ncit.json` - NCIT module containing ancestors of:
  - `NCIT:C48885` Generic Primary Tumor TNM Finding
  - `NCIT:C48884` Generic Regional Lymph Nodes TNM Finding
  - `NCIT:C48883` Generic Distant Metastasis TNM Finding
  - `NCIT:C28108` Disease Stage Qualifier
  ```shell
  robot extract --input ncit.owl --method BOT --term NCIT:C48885 \
    convert --output primary-tnm.ncit.obo
  robot extract --input ncit.owl --method BOT --term NCIT:C48884 \
    convert --output regional-tnm.ncit.obo
  robot extract --input ncit.owl --method BOT --term NCIT:C48883 \
    convert --output distant-tnm.ncit.obo
  robot extract --input ncit.owl --method BOT --term NCIT:C28108 \
    convert --output stages-tnm.ncit.obo

  robot merge --input primary-tnm.ncit.obo \
  --input regional-tnm.ncit.obo \
  --input distant-tnm.ncit.obo \
  --input stages-tnm.ncit.obo \
  --output ncit.json
  ```