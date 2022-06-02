# README

The folder contains toy versions of real resources for testing.

- `mondo.module.json` - MONDO module containing ancestors of `MONDO:0007038` *Achoo syndrome*.
  ```shell
  robot extract --input-iri http://purl.obolibrary.org/obo/mondo.owl --term http://purl.obolibrary.org/obo/MONDO_0007038 --output mondo.module.owl --method BOT --copy-ontology-annotations true 
  obographs convert -f json mondo.module.owl
  rm mondo.module.owl
  ```
  > Note: `robot` does not preserve the `graphs | meta | version` field. Therefore, the line `"version" : "http://purl.obolibrary.org/obo/mondo/releases/2022-05-02/mondo.owl"` was manually inserted into `mondo.module.json`.

- `hp.module.json` - HPO module containing all ancestors of `HP:0001166` *Arachnodactyly* and complete sub-hierarchies  
  except from `HP:0000118` *Phenotypic abnormality*.

- `geno.full.json` - the complete GENO ontology prepared by running:
  ```shell
  wget http://purl.obolibrary.org/obo/geno.owl
  obographs convert -f json geno.owl
  rm geno.owl
  ```

- `uberon.module.json` - UBERON module containing ancestors of `UBERON:0000468` *multicellular organism* prepared by running:
  ```shell
  robot extract --input-iri http://purl.obolibrary.org/obo/uberon.owl --term http://purl.obolibrary.org/obo/UBERON_0000468 --output uberon.module.owl --method BOT --copy-ontology-annotations true 
  obographs convert -f json uberon.module.owl
  rm uberon.module.owl
  ```

- `uo.json` - the complete UO prepared by running:
  ```shell
  wget http://purl.obolibrary.org/obo/uo.owl
  obographs convert -f json uo.owl
  rm uo.owl 
  ```

- `efo.json` - EFO module containing ancestors of `http://www.ebi.ac.uk/efo/EFO_0009370` *genomic DNA* prepared by running:
  ```shell
  robot extract --input-iri http://www.ebi.ac.uk/efo/efo.owl --term http://www.ebi.ac.uk/efo/EFO_0008479 --output efo.module.owl --method BOT --copy-ontology-annotations true 
  obographs convert -f json efo.module.owl
  rm efo.module.owl
  ```
  
- `so.json` - SO module containing descendents of `http://purl.obolibrary.org/obo/SO_0001537` *silent_mutation* prepared by running:
  ```shell
  robot extract --input-iri http://purl.obolibrary.org/obo/so.owl --term http://purl.obolibrary.org/obo/SO_0001017 --output so.module.owl --method BOT --copy-ontology-annotations true
  obographs convert -f json so.module.owl
  ```

- `ncit.module.json` - NCIT module containing ancestors of `http://purl.obolibrary.org/obo/NCIT_C156482` *Genitourinary System Neoplasm* prepared by running:
  ```shell
  robot extract --input-iri http://purl.obolibrary.org/obo/ncit.owl --term http://purl.obolibrary.org/obo/NCIT_C156482 --output ncit.module.owl --method BOT --copy-ontology-annotations true 
  obographs convert -f json ncit.module.owl
  rm ncit.module.owl
  ```

> Note: `robot` and `obographs` expand to `java -jar robot.jar` (`v1.8.3`) and `java -jar obographs-cli.jar` (`v0.3.0`).
 