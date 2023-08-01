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
  - `NCIT:C12680` Body region
  - `NCIT:C28108` Disease Stage Qualifier
  - `NCIT:C38114` Route of administration
  - `NCIT:C41331` Adverse event
  - `NCIT:C48883` Generic Distant Metastasis TNM Finding
  - `NCIT:C48884` Generic Regional Lymph Nodes TNM Finding
  - `NCIT:C48885` Generic Primary Tumor TNM Finding
  - `NCIT:C64493` Schedule frequency
  ```shell
  module load robot
  # Download NCIT OWL
  NCIT_PURL=http://purl.obolibrary.org/obo/ncit.owl
  curl -o ncit.owl $NCIT_PURL
  
  # Extract modules
  terms=(
    "NCIT:C12680"  
    "NCIT:C28108"  
    "NCIT:C38114"
    "NCIT:C41331"
    "NCIT:C48883"
    "NCIT:C48884"
    "NCIT:C48885"
    "NCIT:C64493"
  )
  for term in ${terms[@]}; do
    printf "Processing ${term}\n"
    robot extract --input ncit.owl --method BOT --term ${term} convert --output ${term}.partial.obo
  done
  
  # Build CLI
  inputs=""
  for obo in $(ls *partial.obo); do 
    printf "Adding $obo\n"
    inputs="${inputs}--input ${obo} ";
  done

  # Merge the ontology
  robot merge ${inputs} --output ncit.json
  ```
